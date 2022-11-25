import { storage } from '~/config/firebaseConfig';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export const uploadImage = async (file, path = 'image-ui') => {
    const imageRef = ref(storage, `${path}/${file.name + v4()}`);
    await uploadBytes(imageRef, file);
    return imageRef;
};

export const getImageUrl = async (imageRef, path = 'image-ui') => {
    const imageListRef = ref(storage, `${path}/`);
    const { items } = await listAll(imageListRef);
    const imageChoosen = items.find((imageItem) => imageItem._location.path_ === imageRef._location.path_);
    const url = await getDownloadURL(imageChoosen);
    return url;
};
