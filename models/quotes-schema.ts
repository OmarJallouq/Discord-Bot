import mongoose, { Schema } from 'mongoose'

const reqString = {
    type: String,
    required: true,
}

const quoteSchema = new Schema({
    _id: reqString,
    channelId: reqString,
})

const name = 'quotes database'

export default mongoose.models[name] || mongoose.model(name, quoteSchema, name)