export const Template = () => {
  return (
    <section className="hero">
     
      <video className="heroVideo" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
      </video>

      {children}
    </section>
  );
};
