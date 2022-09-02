import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { IoNotifications } from 'react-icons/io5';
import cs from 'classnames';
import { MessageI, UserI } from 'types/client';
import { getSender } from 'utils';

interface Props {
  messages: MessageI[] | null | undefined;
  user: UserI | null | undefined;
  handleNotificationClick: (message: MessageI) => void;
}

const NotificationsDropdown: React.FC<Props> = ({ messages, user, handleNotificationClick }) => {
  return (
    <Menu>
      {({ open }) => (
        <div className="relative">
          <Menu.Button className="flex items-center hover:bg-slate-200 p-2 rounded-lg">
            <div className="relative">
              <IoNotifications className="text-3xl text-primary" />
              {messages && messages.length ? (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex justify-center items-center">
                  <span className="text-white">{messages.length}</span>
                </span>
              ) : (
                <></>
              )}
            </div>
          </Menu.Button>

          {/* Use the Transition component. */}
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0">
            {/* Mark this component as `static` */}
            <Menu.Items
              as="div"
              className="absolute right-0 top-full h-max p-3 w-200 rounded bg-white shadow-lg">
              {messages?.length ? (
                messages.map((message) => (
                  <Menu.Item key={message._id} as="div">
                    {({ active }) => (
                      <span
                        onClick={() => handleNotificationClick(message)}
                        className={cs(
                          'block text-center p-3 rounded cursor-pointer border-b border-bg-slate-200',
                          {
                            'bg-slate-200': active
                          }
                        )}>
                        {message.chat.isGroupChat
                          ? `New message in ${message.chat.chatName}`
                          : `New message from ${getSender(user, message.chat.users)}`}
                        {/* {message.content} */}
                      </span>
                    )}
                  </Menu.Item>
                ))
              ) : (
                <div>No New Messages</div>
              )}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
};

export default NotificationsDropdown;
