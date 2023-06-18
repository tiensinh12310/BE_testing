var mSchema = {};
mSchema.mongoose = require('./dbMongo');

var q = require('q');
var util = require('util');

var Schema = mSchema.mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Mixed = Schema.Types.Mixed;

var Util = require('../../utils/helper');

mSchema.ObjectId = ObjectId;
mSchema.Mixed = Mixed;

const validator = require('validator');
//--------------------
function BaseSchema() {
    Schema.apply(this, arguments);
    this.add({
        created: {
            type: Number,
            default: 0
        },
        updated: {
            type: Number,
            default: 0
        },
        deleted: {
            type: Number,
            default: 0
        }
    });

    this.methods.saveDoc = function () {
        if (this.isNew) {
            this.created = Util.time_now();
        } else {
            this.updated = Util.time_now();
        }
        return this.save()
    };
    this.methods.removeDoc = function () {
        this.deleted = Util.time_now();
        return this.save()
    };

    this.statics.removeDoc = function () {
        var c = arguments[0];

        var ok = 0;
        var fail = 0;
        return this.find(c).then(function (rs) {
            return q.all(rs.map(function (item) {
                return item.removeDoc().then(function (rs) {
                    if (rs) {
                        ok += 1;
                        return true
                    }
                    fail++;
                    return false;
                });
            })).then(function (rs) {
                return {ok: ok, fail: fail};
            })
        });

    };

    this.statics.createDoc = function () {
        var list = [];
        var args1 = arguments[0];
        if (args1 instanceof Array) {
            list = args1;
        }
        else {
            list = [args1];
        }
        list = list.map(function (item) {
            item.created = Util.time_now();
            return item;
        });
        arguments[0] = list;
        return this.create.apply(this, arguments);

    };
    this.statics.updateDoc = function () {
        var doc = arguments[1];
        if (!doc.hasOwnProperty('$set')) {
            doc.$set = {};
        }
        doc.$set.updated = Util.time_now();

        return this.updateOne.apply(this, arguments);
    };

    this.statics.upsertDoc = function (condition, insertValue) {
        var doc = new this(insertValue);
        doc = doc.toObject();
        doc.created = Util.time_now();
        delete doc._id;
        delete doc.id;
        return this.findOneAndUpdate(condition, doc, {upsert: true, new: true})
            .then(function (doc) {
                return doc;
            });
    };

    this.statics.findDoc = function () {
        var doc = arguments[0];
        if (!doc) doc = {};
        if (!doc.hasOwnProperty('deleted')) {
            doc.deleted = 0;
        }

        return this.find.apply(this, arguments);
    };

    this.statics.findOneDoc = function () {
        var doc = arguments[0];
        if (!doc.hasOwnProperty('deleted')) {
            doc.deleted = 0;
        }
        return this.findOne.apply(this, arguments);
    };

    this.statics.getBulk = function (isUnordered) {
        var self = this;
        return q.when()
            .then(function () {
                return q.nfcall(self.collection.findOne.bind(self.collection));
            })
            .then(function () {
                if (isUnordered) {
                    return self.collection.initializeUnorderedBulkOp();
                }
                return self.collection.initializeOrderedBulkOp();
            })
            .then(function (bulk) {
                var oldExecute = bulk.execute.bind(bulk);
                bulk.execute = function () {
                    return q.nfapply(oldExecute, arguments);
                };
                return bulk;
            })
    };

    this.statics.aggregateDoc = function () {
        var args = [];
        if (arguments[0] instanceof Array) {
            args = arguments[0];
        } else {
            args.push(arguments[0]);
        }
        var foundMatch = false;
        args.some(function (item) {
            if (item.hasOwnProperty('$match')) {
                item.$match.deleted = 0;
                foundMatch = true;
                return true
            }
            return false
        });

        if (!foundMatch) {
            var match = {
                $match: {deleted: 0}
            };
            args.push(match);
        }
        arguments[0] = args;
        return this.aggregate.apply(this, arguments);
    };

    this.set('toObject', {virtuals: true});
    this.set('toJSON', {virtuals: true});
}

util.inherits(BaseSchema, Schema);
//--------------------

mSchema.CollectionName = {
    'contact': 'contact'
}

//--------------------

mSchema.contact = new BaseSchema({
    first_name: {type: String},
    last_name: {type: String},
    twitter: {type: String},
    avatar: {type: String},
    notes: {type: String},
    phone_number: {type: String},
    email: {type: String},
    favorite: { type: Boolean}
})
//--------------------

module.exports = mSchema;