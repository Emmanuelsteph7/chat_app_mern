import mongoose, { Schema, Document } from 'mongoose';

export interface MessageI {
  sender: string;
  content: string;
  chat: string;
}

export interface MessageModelI extends MessageI, Document {}

const MessageSchema: Schema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageModelI>('Message', MessageSchema);

export default MessageModel;
