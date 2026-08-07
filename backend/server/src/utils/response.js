export const sendSuccess = (res, { statusCode = 200, message = 'Success', data = null, meta = null }) => {
  const body = { success: true, message, data };
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
};

export const sendError = (res, { statusCode = 500, message = 'Server error', errors = [] }) => {
  return res.status(statusCode).json({ success: false, message, errors, statusCode });
};

export const sendPagination = (res, { message = 'Success', data = [], pagination = {} }) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta: { pagination },
  });
};

export default { sendSuccess, sendError, sendPagination };
