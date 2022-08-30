import mongoose, { Schema, Document } from 'mongoose';

export interface ChatI {
  chatName: string;
  isGroupChat: boolean;
  users: string[];
  latestMessage: string;
}

export interface ChatModelI extends ChatI, Document {}

const ChatSchema: Schema = new Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model<ChatModelI>('Chat', ChatSchema);

export default ChatModel;
