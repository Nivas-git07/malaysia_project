import video from "../../../user/assets/animate2.mp4"

export const Template = ({ children }) => {
  return (
    <section className="hero">
     
      <video className="heroVideo" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
      </video>

      {children}
    </section>
  );
};
