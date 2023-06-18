const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

var Model = function () {
    var self = this;
    self.q = require('q');
    self.mongodb = require('../core/database/dbModel');
    self.error = require('../core/system_error');

};
var model = Model.prototype;


model.get_list = function (query) {
    var self = this;
    var { q } = query
    var filter = []
    var condition = {}

    return self.q.when() 
        .then(function () {
            if (q) {
                filter.push({ first_name:{ $regex: `${q}`, $options: 'i' }})
                filter.push({ last_name: { $regex: `${q}`, $options: 'i' }})
                condition = { $or: filter}
            }
            return self.mongodb.contact.findDoc(condition).sort({created: -1})
        })
}

model.get_detail = function (params) {
    var self = this;
    var { id } = params

    return self.q.when()
        .then(function () {
            return self.mongodb.contact.findOneDoc({ _id: ObjectId(id)})
        })
}

model.create = function (post) {
    var self = this;

    return self.q.when()
        .then(function () {
            return self.mongodb.contact.createDoc({...post })
        })
        .then(function (doc) {
            return doc[0];
        })
}

model.update = function (params, post) {
    var self = this;
    var { id } = params

    return self.q.when()
        .then(function () {
            return self.mongodb.contact.findOneDoc({ _id: ObjectId(id) })
                .then(function (contact) {
                    if (!contact) {
                        throw new self.error(404, 'Contact has been not found')
                    }
                })
        })
        .then(function () {
            delete post?.id
            var insert = {
               ...post
            }
            return self.mongodb.contact.updateDoc({ _id: ObjectId(id) }, insert)
        })
        .then(function (doc) {
            return doc;
        })
}

model.delete = function (params) {
    var self = this;
    var { id } = params

    return self.q.when()
        .then(function () {
            return self.mongodb.contact.findOneDoc({ _id: ObjectId(id) })
                .then(function (contact) {
                    if (!contact) {
                        throw new self.error(404, 'Contact has been not found')
                    }
                })
        })
        .then(function () {
            return self.mongodb.contact.removeDoc({ _id: ObjectId(id) })
        })
        .then(function (doc) {
            return doc;
        })
}


module.exports = Model;