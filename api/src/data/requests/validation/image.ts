import * as yup from 'yup';

export const uploadImageRequest = {
  body: {
    recordId: yup.string().uuid().required(),
  },
};

export const deleteImageRequest = {
  params: {
    imageId: yup.string().uuid().required(),
  },
};
