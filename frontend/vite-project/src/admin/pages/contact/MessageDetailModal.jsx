import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Mail, Send, X } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/Badge';
import { contactService } from '../../services/contact.service';
import { getErrorMessage } from '../../utils/api';
import { formatDateTime } from '../../utils/format';

export const MessageDetailModal = ({ open, onClose, message }) => {
  const queryClient = useQueryClient();
  const [reply, setReply] = useState('');

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['contact-messages'] });

  const markReadMutation = useMutation({
    mutationFn: (id) => contactService.markRead(id),
    onSuccess: () => invalidate(),
    onError: () => {},
  });

  const replyMutation = useMutation({
    mutationFn: ({ id, reply }) => contactService.reply(id, reply),
    onSuccess: () => {
      toast.success('Reply sent to sender');
      setReply('');
      invalidate();
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  if (!open || !message) return null;

  const alreadyReplied = Boolean(message.reply);

  return (
    <Modal open={open} onClose={onClose} maxWidth="md">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{message.subject || 'Message'}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDateTime(message.createdAt)} · {message.category}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50">
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-100">{message.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {message.email}
            {message.phone ? ` · ${message.phone}` : ''}
          </p>
        </div>
        <StatusBadge status={message.isRead ? message.status : 'new'} />
      </div>

      <div className="max-h-72 overflow-y-auto rounded-xl border border-gray-100 p-4 text-sm leading-relaxed text-gray-700 dark:border-gray-800 dark:text-gray-300">
        {message.message}
      </div>

      {alreadyReplied && (
        <div className="mt-4 rounded-xl border border-primary-100 bg-primary-50 p-4 dark:border-primary-500/20 dark:bg-primary-500/5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
            Your reply
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{message.reply}</p>
          {message.repliedAt ? (
            <p className="mt-2 text-xs text-gray-400">{formatDateTime(message.repliedAt)}</p>
          ) : null}
        </div>
      )}

      {!alreadyReplied && (
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Reply</label>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary-500 dark:focus:ring-primary-500/20"
            placeholder="Write a reply to the sender…"
          />
          <Button
            className="mt-3 w-full"
            onClick={() => replyMutation.mutate({ id: message._id, reply })}
            loading={replyMutation.isPending}
            disabled={!reply.trim()}
          >
            <Send className="h-4 w-4" />
            Send reply
          </Button>
        </div>
      )}

      {!message.isRead && (
        <button
          type="button"
          onClick={() => markReadMutation.mutate(message._id)}
          className="mt-3 text-xs font-medium text-primary-600 hover:underline dark:text-primary-400"
        >
          Mark as read
        </button>
      )}
    </Modal>
  );
};

export default MessageDetailModal;
