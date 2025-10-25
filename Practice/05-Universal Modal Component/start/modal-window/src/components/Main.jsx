import Button from "./Button";


export default function Main({isModalOpen, openModal, children}) {
    return (
      <>
        <h1 className="title">Universal Modal Component</h1>
        <Button handleClick={openModal} className={"button"}>Open Modal</Button>
        {isModalOpen && children}
      </>
    )
}