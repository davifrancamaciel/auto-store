export default function getImage (image, name) {
  const urlDefault = `https://api.adorable.io/avatar/50/${name}.png`
  try {
    return `${process.env.REACT_APP_API_URL}/files/${image}` || urlDefault
  } catch (error) {
    return urlDefault
  }
}
