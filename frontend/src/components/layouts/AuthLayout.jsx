const AuthLayout = ({ children }) => {
  return (
    <section className="flex">
      <div className="authLayout">
        <h2 className="logo--text">Solnance</h2>
        {children}
      </div>

      <div className="auth__bg" />
    </section>
  );
};

export default AuthLayout;
