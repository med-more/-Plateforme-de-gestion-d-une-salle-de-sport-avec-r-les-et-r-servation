import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../utils/auth';
import { login } from '../../services/authService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

function Login() {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            console.log('Submitting login form with values:', values); // Debugging: Log form values

            const { token, user } = await login(values);
            console.log('Login response:', { token, user }); // Debugging: Log login response

            authLogin({ ...user, token }); // Ensure the user object includes the ID
            toast.success('Login successful');
            navigate('/dashboard');
          } catch (error) {
            console.error('Login error:', error.response?.data || error.message); // Debugging: Log the error
            toast.error('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <Field type="email" name="email" className="w-full p-2 border rounded" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Password</label>
              <Field type="password" name="password" className="w-full p-2 border rounded" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;