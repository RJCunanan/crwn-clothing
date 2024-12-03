import './form-input.style.scss';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            
            {/* If the label exists, render this label */}
            {label && (
                <label 
                    className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};

export default FormInput;