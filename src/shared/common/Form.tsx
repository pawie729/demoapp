import * as React from "react";

interface FormContainerProps {
  children: React.ReactNode;
  className?: string;
}
interface FormBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
interface FormHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}
interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const FormContainerContext = React.createContext<{} | undefined>(undefined);

const FormContainer: React.FC<FormContainerProps> = ({ className = "", children }) => {
  return (
    <FormContainerContext.Provider value={{}}>
      <div
        className={`my-4 mx-8 md:m-4 bg-white p-4 rounded-lg shadow-md lg:text-sm md:text-xs ${className}`}
      >
        {children}
      </div>
    </FormContainerContext.Provider>
  );
};

const FormBody: React.FC<FormBodyProps> = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

const FormHeader: React.FC<FormHeaderProps> = ({ title, className = "", children, ...props }) => {
  return (
    <div className={`border-b p-4 ${className}`} {...props}>
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      {children}
    </div>
  );
};

const FormField: React.FC<FormFieldProps> = ({ className = "", children, ...props }) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Export all components for reuse
export { FormContainer, FormBody, FormHeader, FormField };
