import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Simulate API call for password reset
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated API delay

      // Assume the email is valid and the reset link is sent
      setSuccessMessage(
        'Un lien de réinitialisation du mot de passe a été envoyé à votre adresse email.'
      );
      setEmail('');
    } catch (error) {
      setErrorMessage(
        'Une erreur est survenue. Veuillez réessayer ultérieurement.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Mot de Passe Oublié
        </h1>

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 mb-4 rounded">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Adresse Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Entrez votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-bold py-2 px-4 rounded focus:outline-none`}
            >
              {isSubmitting ? 'Envoi...' : 'Envoyer'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Retour à la connexion
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
