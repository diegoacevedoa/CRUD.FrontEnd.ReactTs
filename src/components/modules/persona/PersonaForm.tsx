import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { IDataPersona } from "../../../api/persona/interfaces";
import Modal from "../../ui/modal";
import Loading from "../../ui/loading";
import Button from "../../ui/button";
import GuardarIcon from "../../ui/icons/GuardarIcon";
import SalidaIcon from "../../ui/icons/SalidaIcon";
import Swal from "sweetalert2";
import { createPersona, updatePersona } from "../../../api/persona";
import { IUseForm, useForm } from "../../../hooks/useForm";

interface IPersonaForm {
  titleModal: string;
  isNewModal: boolean;
  showModal: boolean;
  setShowModal: Function;
  activeForm: IDataPersona;
  allData: IDataPersona[];
  setAllData: Function;
}

// const defaultValidationValues = {
//   noDocumento: { invalid: false, message: "" },
//   nombres: { invalid: false, message: "" },
//   apellidos: { invalid: false, message: "" },
// };

// const validationMessages = {
//   noDocumento: "El No Documento es requerido.",
//   nombres: "Los Nombres son requeridos.",
//   apellidos: "Los Apellidos son requeridos.",
// };

export const PersonaForm = ({
  titleModal = "",
  isNewModal = false,
  showModal = false,
  setShowModal,
  activeForm,
  allData,
  setAllData,
}: IPersonaForm) => {
  const [loadingModal, setLoadingModal] = useState(false);

  const paramUseForm: IUseForm = {
    initialState: activeForm,
  };

  const { formValues, handleChange, reset } = useForm(paramUseForm);

  //Guarda un valor mutable
  const activeId = useRef(activeForm.idPersona);

  //Mostrar los datos en pantalla cada que seleccionan una registro diferente a la inicial
  useEffect(() => {
    //Si id cambia, entonces se renderiza el compononte de y se hace esto para evitar ciclo infinito
    if (activeForm.idPersona !== activeId.current) {
      reset(activeForm);
      activeId.current = activeForm.idPersona;
    }
  }, [activeForm, reset]);

  const handleOnSaveModal = useCallback((e: any) => {
    e.preventDefault();

    // triggerValidation();

    // if (
    //   !valid ||
    //   formValues.noDocumento === "" ||
    //   formValues.nombres === "" ||
    //   formValues.apellidos === ""
    // ) {
    //   return;
    // }

    if (isNewModal) {
      handleCreatePersona();
    } else {
      handleUpdatePersona();
    }
  }, []);

  const handleCreatePersona = useCallback(async () => {
    setLoadingModal(true);

    // const response = await createPersona(formValues);

    // if (response.apiError) {
    //   Swal.fire(
    //     "Error",
    //     response.apiMessage + " " + (response.apiErrors ?? ""),
    //     "error"
    //   );
    // } else {
    //   Swal.fire("OK!", "El registro se ha creado exitosamente.", "success");

    //   const newData = { idPersona: response.apiData.idPersona, ...formValues };

    //   setAllData([newData, ...allData]);
    // }

    setLoadingModal(false);
    setShowModal(false);
  }, []);

  const handleUpdatePersona = useCallback(async () => {
    setLoadingModal(true);

    // const response = await updatePersona(formValues);

    // if (response.apiError) {
    //   Swal.fire(
    //     "Error",
    //     response.apiMessage + " " + (response.apiErrors ?? ""),
    //     "error"
    //   );
    // } else {
    //   Swal.fire(
    //     "OK!",
    //     "El registro se ha actualizado exitosamente.",
    //     "success"
    //   );

    //   const newList = allData.map((item) =>
    //     item.idPersona === formValues.idPersona ? formValues : item
    //   );

    //   setAllData(newList);
    // }

    setLoadingModal(false);
    setShowModal(false);
  }, []);

  const handleOnCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const getBodyModal = useMemo(() => {
    return (
      <div className="container-fluid">
        <form
          id="formPersona"
          onSubmit={handleOnSaveModal}
          className="animate__animated animate__fadeIn animate__faster"
          noValidate
        >
          <div className="row">
            <div className="col-4">
              {/* <Field
                id="noDocumento"
                label="No Documento"
                placeholder="Ingrese No Documento"
                onChange={handleInputChange}
                value={formValues.noDocumento}
                autoFocus={true}
                autoComplete="off"
                type="text"
                disabled={loadingModal}
                required
                error={validationValues.noDocumento.message}
                isInvalid={validationValues.noDocumento.invalid}
                index={1}
              /> */}
            </div>
            <div className="col-4">
              {/* <Field
                id="nombres"
                label="Nombres"
                placeholder="Ingrese Nombres"
                onChange={handleInputChange}
                value={formValues.nombres}
                autoFocus={true}
                autoComplete="off"
                type="text"
                disabled={loadingModal}
                required
                error={validationValues.nombres.message}
                isInvalid={validationValues.nombres.invalid}
                index={2}
              /> */}
            </div>
            <div className="col-4">
              {/* <Field
                id="apellidos"
                label="Apellidos"
                placeholder="Ingrese Apellidos"
                onChange={handleInputChange}
                value={formValues.apellidos}
                autoFocus={true}
                autoComplete="off"
                type="text"
                disabled={loadingModal}
                required
                error={validationValues.apellidos.message}
                isInvalid={validationValues.apellidos.invalid}
                index={3}
              /> */}
            </div>
          </div>
        </form>
      </div>
    );
  }, []);

  const getFooterModal = useMemo(() => {
    return (
      <>
        <Button
          variant="secondary"
          disabled={loadingModal}
          tabIndex={4}
          onClick={handleOnCloseModal}
          icon={<SalidaIcon width="1em" height="1em" />}
          type="button"
        >
          Cerrar
        </Button>
        <Button
          variant="primary"
          disabled={loadingModal}
          tabIndex={5}
          icon={<GuardarIcon width="1em" height="1em" />}
          type="submit"
          form="formPersona"
        >
          Guardar
        </Button>
      </>
    );
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          body={getBodyModal}
          foot={getFooterModal}
          head={titleModal}
          onClose={handleOnCloseModal}
          show={showModal}
          size="lg"
        />
      )}
      <Loading show={loadingModal} />
    </>
  );
};
