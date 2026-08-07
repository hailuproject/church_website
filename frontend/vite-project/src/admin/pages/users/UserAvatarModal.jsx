import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ImagePlus } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { FileUpload } from '../../components/ui/FileUpload';
import { userService } from '../../services/system.service';
import { getErrorMessage } from '../../utils/api';

export const UserAvatarModal = ({ open, onClose, user }) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: ({ id, file }) => userService.uploadAvatar(id, file),
    onSuccess: () => {
      toast.success('Avatar updated');
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      onClose();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  if (!open || !user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Update avatar"
      subtitle={user.name}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={() => mutation.mutate({ id: user._id, file })} loading={mutation.isPending} disabled={!file}>
            Upload avatar
          </Button>
        </>
      }
    >
      <FileUpload
        type="image"
        label="Profile photo"
        value={file}
        onChange={setFile}
        hint="Square image, ideally 512×512"
      />
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
        <ImagePlus className="h-4 w-4" />
        <span>The photo will be shown next to the user's name across the dashboard.</span>
      </div>
    </Modal>
  );
};

export default UserAvatarModal;
