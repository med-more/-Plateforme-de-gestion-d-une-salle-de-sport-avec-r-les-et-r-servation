import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../utils/auth.jsx';
import { toast } from 'react-hot-toast';

// Validation schema using Yup
const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required('Le prénom est requis'),
  lastName: Yup.string().required('Le nom est requis'),
  email: Yup.string().email('Email invalide').required('L\'email est requis'),
  dateOfBirth: Yup.date().nullable(),
  role: Yup.string().required('Le rôle est requis'),
  oldPassword: Yup.string().when('newPassword', (newPassword, schema) => {
    // If newPassword is provided, oldPassword is required
    return newPassword && newPassword.length > 0
      ? schema.required('L\'ancien mot de passe est requis')
      : schema;
  }),
  newPassword: Yup.string()
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .nullable(),
});

function Profile() {
  const { user } = useAuth();

  const initialValues = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
    role: user.role || '',
    oldPassword: '',
    newPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      console.log('Submitting form with values:', values); // Debugging: Log form values
  
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(values),
      });
  
      console.log('Response status:', response.status); // Debugging: Log response status
  
      if (!response.ok) {
        const errorText = await response.text(); // Get the raw response for debugging
        console.error('Error response:', errorText); // Debugging: Log error response
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Success response:', data); // Debugging: Log success response
      toast.success(data.message);
    } catch (error) {
      console.error('Profile update error:', error); // Debugging: Log caught error
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profil</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg shadow-md">
            {/* First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Prénom</label>
              <Field
                type="text"
                name="firstName"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Nom</label>
              <Field
                type="text"
                name="lastName"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date de naissance</label>
              <Field
                type="date"
                name="dateOfBirth"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Role */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rôle</label>
              <Field
                as="select"
                name="role"
                className="w-full p-2 border rounded"
              >
                <option value="member">Membre</option>
                <option value="trainer">Entraîneur</option>
              </Field>
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Old Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Ancien mot de passe</label>
              <Field
                type="password"
                name="oldPassword"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
            </div>

            {/* New Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Nouveau mot de passe</label>
              <Field
                type="password"
                name="newPassword"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {isSubmitting ? 'Mise à jour en cours...' : 'Mettre à jour le profil'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Profile;