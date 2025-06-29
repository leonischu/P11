import React, { useState } from "react"

// Mock Formik and Yup for demo purposes
const Formik = ({ children, initialValues, validationSchema, onSubmit }) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (name, value) => {
    // Simple validation logic for demo
    const newErrors = { ...errors }
    
    if (name === 'firstName' && !value) newErrors.firstName = 'First name is required'
    else if (name === 'firstName') delete newErrors.firstName
    
    if (name === 'lastName' && !value) newErrors.lastName = 'Last name is required'
    else if (name === 'lastName') delete newErrors.lastName
    
    if (name === 'email' && !value) newErrors.email = 'Email is required'
    else if (name === 'email' && value && !value.includes('@')) newErrors.email = 'Invalid email'
    else if (name === 'email') delete newErrors.email
    
    if (name === 'phone' && !value) newErrors.phone = 'Phone number is required'
    else if (name === 'phone') delete newErrors.phone
    
    if (name === 'password' && !value) newErrors.password = 'Password is required'
    else if (name === 'password' && value && value.length < 6) newErrors.password = 'Password must be at least 6 characters'
    else if (name === 'password') delete newErrors.password
    
    if (name === 'confirmPassword' && value !== values.password) newErrors.confirmPassword = 'Passwords must match'
    else if (name === 'confirmPassword') delete newErrors.confirmPassword
    
    if (name === 'agreeToTerms' && !value) newErrors.agreeToTerms = 'You must agree to terms and conditions'
    else if (name === 'agreeToTerms') delete newErrors.agreeToTerms
    
    setErrors(newErrors)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate all fields
    Object.keys(values).forEach(key => validateField(key, values[key]))
    
    if (Object.keys(errors).length === 0) {
      await onSubmit(values)
    }
    setIsSubmitting(false)
  }

  return children({
    isSubmitting,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue: (name, value) => {
      setValues({ ...values, [name]: value })
      validateField(name, value)
    },
    setFieldTouched: (name) => setTouched({ ...touched, [name]: true })
  })
}

const Form = ({ children, onSubmit, ...props }) => (
  <div onSubmit={onSubmit} {...props}>
    {children}
  </div>
)

const Field = ({ name, type, className, placeholder, id, as: Component = "input", children, ...props }) => {
  const formik = React.useContext(FormikContext) || {}
  
  if (Component === "select") {
    return (
      <select
        id={id}
        name={name}
        className={className}
        value={formik.values?.[name] || ""}
        onChange={(e) => formik.setFieldValue?.(name, e.target.value)}
        onBlur={() => formik.setFieldTouched?.(name)}
        {...props}
      >
        {children}
      </select>
    )
  }
  
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      value={type === "checkbox" ? undefined : (formik.values?.[name] || "")}
      checked={type === "checkbox" ? formik.values?.[name] || false : undefined}
      onChange={(e) => {
        const value = type === "checkbox" ? e.target.checked : e.target.value
        formik.setFieldValue?.(name, value)
      }}
      onBlur={() => formik.setFieldTouched?.(name)}
      {...props}
    />
  )
}

const ErrorMessage = ({ name, component: Component = "div", className }) => {
  const formik = React.useContext(FormikContext) || {}
  const error = formik.errors?.[name]
  const touched = formik.touched?.[name]
  
  if (!error || !touched) return null
  
  return <Component className={className}>{error}</Component>
}

const FormikContext = React.createContext()

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "customer",
    agreeToTerms: false,
  }

  const handleSubmit = async (values) => {
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert(`Registration successful for ${values.firstName} ${values.lastName}!`)
      console.log("Form values:", values)
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '1200px',
        width: '100%',
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        minHeight: '700px'
      }}>
        <div style={{ padding: '40px' }}>
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#333',
              marginBottom: '10px'
            }}>
              Create Your Account
            </h1>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Join Swornim and start planning amazing events
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <FormikContext.Provider value={formik}>
                <Form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {error && (
                    <div style={{ 
                      background: '#fee', 
                      color: '#c33', 
                      padding: '12px', 
                      borderRadius: '8px',
                      border: '1px solid #fcc'
                    }}>
                      {error}
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      I want to:
                    </label>
                    <Field 
                      as="select" 
                      name="userType" 
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '10px',
                        fontSize: '16px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="customer">Book services for my events</option>
                      <option value="vendor">Offer my services as a vendor</option>
                    </Field>
                    <ErrorMessage name="userType" className="field-error" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="Enter your first name"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e1e5e9',
                          borderRadius: '10px',
                          fontSize: '16px'
                        }}
                      />
                      <ErrorMessage name="firstName" component="div" style={{ color: '#c33', fontSize: '14px', marginTop: '5px' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Enter your last name"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e1e5e9',
                          borderRadius: '10px',
                          fontSize: '16px'
                        }}
                      />
                      <ErrorMessage name="lastName" component="div" style={{ color: '#c33', fontSize: '14px', marginTop: '5px' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      Email Address
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '10px',
                        fontSize: '16px'
                      }}
                    />
                    <ErrorMessage name="email" component="div" style={{ color: '#c33', fontSize: '14px', marginTop: '5px' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                      Phone Number
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="+977-XXXXXXXXXX"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '10px',
                        fontSize: '16px'
                      }}
                    />
                    <ErrorMessage name="phone" component="div" style={{ color: '#c33', fontSize: '14px', marginTop: '5px' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e1e5e9',
                          borderRadius: '10px',
                          fontSize: '16px'
                        }}
                      />
                      <ErrorMessage name="password" component="div" style={{ color: '#c33', fontSize: '14px', marginTop: '5px' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}>
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '2px solid #e1e5e9',
                          borderRadius: '10px',
                          fontSize: '16px'
                        }}
                      />
                      <ErrorMessage name="confirmPassword" component="div" style={{ color: '#c33', fontSize: '14px', marginTop: '5px' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <Field type="checkbox" name="agreeToTerms" />
                      <span style={{ fontSize: '14px', color: '#555' }}>
                        I agree to the{" "}
                        <a href="#" style={{ color: '#667eea', textDecoration: 'none' }}>
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" style={{ color: '#667eea', textDecoration: 'none' }}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                    <ErrorMessage name="agreeToTerms" component="div" style={{ color: '#c33', fontSize: '14px', marginTop: '5px' }} />
                  </div>

                  <button
                    type="submit"
                    disabled={formik.isSubmitting || isLoading}
                    style={{
                      width: '100%',
                      padding: '15px',
                      background: formik.isSubmitting || isLoading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: formik.isSubmitting || isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    {formik.isSubmitting || isLoading ? (
                      <>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '2px solid transparent',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </Form>
              </FormikContext.Provider>
            )}
          </Formik>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#666' }}>
              Already have an account?{" "}
              <a href="#" style={{ color: '#667eea', textDecoration: 'none', fontWeight: '500' }}>
                Sign in here
              </a>
            </p>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Start Your Event Journey</h2>
            <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
              Connect with the best vendors and create unforgettable memories
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ✓
              </div>
              <span style={{ fontSize: '1.1rem' }}>Verified Vendors</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ⭐
              </div>
              <span style={{ fontSize: '1.1rem' }}>Best Prices</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                📞
              </div>
              <span style={{ fontSize: '1.1rem' }}>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Register