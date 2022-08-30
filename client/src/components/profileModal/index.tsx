import React from 'react';
import { Dialog } from '@headlessui/react';
import { UserI } from 'types/client';
import { Button, Text } from 'components';

interface Props {
  state: boolean;
  handleClose: () => void;
  user: UserI | null | undefined;
}

const ProfileModal: React.FC<Props> = ({ handleClose, state, user }) => {
  return (
    <Dialog open={state} onClose={handleClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-10 w-full max-w-400 rounded-lg">
          <Text.H3 className="text-center">{user?.name || 'Name'}</Text.H3>
          {/* <Dialog.Description>This will permanently deactivate your account</Dialog.Description> */}
          <div className="w-200 h-200 my-5 mx-auto rounded-full shadow overflow-hidden">
            <img src={user?.picture || ''} alt={user?.name || ''} />
          </div>

          <Text className="text-center mb-5">Email: {user?.email || 'email'}</Text>

          <div className="flex justify-center">
            <Button className="px-8" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProfileModal;
