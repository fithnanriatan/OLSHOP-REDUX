import ReactDOM from 'react-dom'

const BackdropOverlay = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-70'></div>
    )
}

const ModalOverlay = ({ children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {children}
            </div>
        </div>
    );
};

const portalElement = document.getElementById('modal')

const Modal = ({children}) => {
    return (
        <>
            {ReactDOM.createPortal(<BackdropOverlay/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal