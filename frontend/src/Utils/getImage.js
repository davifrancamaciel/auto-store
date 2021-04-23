import avatar from '../assets/avatar.png'
export default function getImage (image, name) {
  try {
    return image
      ? `${process.env.REACT_APP_API_URL}/files/${image}`
      : avatar
  } catch (error) {
    return avatar
  }
}
