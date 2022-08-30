import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { CgChevronDown } from 'react-icons/cg';
import cs from 'classnames';
import { UserI } from 'types/client';

interface Props {
  user: UserI | null | undefined;
  handleOpenProfile: () => void;
  handleLogout: () => void;
}

const AvatarDropdown: React.FC<Props> = ({ user, handleOpenProfile, handleLogout }) => {
  return (
    <Menu>
      {({ open }) => (
        <div className="relative">
          <Menu.Button className="flex items-center hover:bg-slate-200 p-2 rounded-lg">
            <span className="inline-block w-10 h-10 shadow mr-2 rounded-full overflow-hidden">
              <img src={user?.picture || ''} alt={user?.name || ''} />
            </span>
            <CgChevronDown />
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
              <Menu.Item as="div">
                {({ active }) => (
                  <span
                    onClick={handleOpenProfile}
                    className={cs(
                      'block text-center p-3 rounded cursor-pointer border-b border-bg-slate-200',
                      {
                        'bg-slate-200': active
                      }
                    )}>
                    My Profile
                  </span>
                )}
              </Menu.Item>
              <Menu.Item as="div">
                {({ active }) => (
                  <span
                    onClick={handleLogout}
                    className={cs('block text-center p-3 rounded cursor-pointer', {
                      'bg-slate-200': active
                    })}>
                    Logout
                  </span>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
};

export default AvatarDropdown;
