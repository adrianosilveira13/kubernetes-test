const SignUp = () => {
  return (
    <form action=''>
      <h1>SignUp</h1>
      <div className='form-group'>
        <label htmlFor=''>Email Addres</label>
        <input type='text' className='form-control' />
      </div>
      <div className='form-group'>
        <label htmlFor=''>Password</label>
        <input type='password' className='form-control' />
      </div>
      <button className='btn btn-primary'>Sign Up</button>
    </form>
  );
};

export default SignUp;