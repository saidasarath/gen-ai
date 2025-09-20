import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { useAuth } from '../../hooks/useAuth';

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: 'admin@interview.com',
    password: 'password123',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, signup, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!isLogin && !formData.name) newErrors.name = 'Name is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let success = false;
    if (isLogin) {
      success = await login(formData.email, formData.password);
    } else {
      success = await signup(formData.name, formData.email, formData.password);
    }

    if (success) {
      console.log('Login successful, calling onSuccess');
      // Add a small delay to ensure state is updated
      setTimeout(() => {
        onSuccess();
      }, 200);
    } else {
      console.log('Login failed');
      setErrors({ general: 'Authentication failed. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Interview Coach
          </h1>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Default Credentials Info */}
        {isLogin && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Default Login Credentials:</h3>
            <div className="text-sm text-blue-800 space-y-1 mb-3">
              <div><strong>Email:</strong> admin@interview.com</div>
              <div><strong>Password:</strong> password123</div>
            </div>
            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
              loading={loading}
            >
              Quick Login
            </Button>
            <Button
              type="button"
              onClick={() => {
                console.log('Direct login test');
                onSuccess();
              }}
              className="w-full bg-green-600 hover:bg-green-700 mt-2"
            >
              Test Direct Login
            </Button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              placeholder="Enter your full name"
            />
          )}
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="Enter your email"
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            placeholder="Enter your password"
          />

          {errors.general && (
            <div className="text-red-600 text-sm">{errors.general}</div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          {isLogin ? (
            <div className="text-sm text-gray-500">
              <p>Registration is currently disabled.</p>
              <p>Please use the default credentials above to sign in.</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};