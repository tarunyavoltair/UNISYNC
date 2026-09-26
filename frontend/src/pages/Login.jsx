function Login() {
  return (
    <div>
      <h1>Welcome to UNISYNC</h1>

      <form>
        <input
          type="email"
          placeholder="College Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;