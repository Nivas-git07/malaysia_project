export default function UserMap({ lat, lng }) {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;

  return (
    <iframe
      src={mapUrl}
      width="100%"
      height="400"
      style={{ border: 0, borderRadius: "12px" }}
    ></iframe>
  );
}