import { useState, useCallback } from "react";
import Label from "../../ui/label/Label";
import { PersonaList } from "./PersonaList";
import Button from "../../ui/button";
import { IDataPersona } from "../../../api/persona/interfaces";
import { PersonaForm } from "./PersonaForm";
import AgregarIcon from "../../ui/icons/AgregarIcon";

export const Persona = () => {
  const [loading, setLoading] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [isNewModal, setIsNewModal] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeForm, setActiveForm] = useState<IDataPersona>();
  const [allData, setAllData] = useState<IDataPersona[]>([]);

  const handleNew = useCallback(() => {
    const defaultFormValues: IDataPersona = {
      idPersona: 0,
      noDocumento: "",
      nombres: "",
      apellidos: "",
    };

    setTitleModal("Agregar Registro");
    setIsNewModal(true);
    setShowModal(true);
    setActiveForm(defaultFormValues);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-10">
          <Label
            align="left"
            hasMargin
            type={2}
            value="Persona"
            variant="title"
          />
        </div>
        <div className="col-2" style={{ alignSelf: "center", float: "right" }}>
          <Button
            className="mb-btn-float-end"
            variant="primary"
            disabled={loading}
            tabIndex={1}
            icon={<AgregarIcon width="20" height="20" />}
            type="button"
            onClick={handleNew}
          >
            Nuevo
          </Button>

          {showModal && activeForm && (
            <PersonaForm
              titleModal={titleModal}
              isNewModal={isNewModal}
              showModal={showModal}
              setShowModal={setShowModal}
              activeForm={activeForm}
              allData={allData}
              setAllData={setAllData}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <PersonaList
            loading={loading}
            setLoading={setLoading}
            setTitleModal={setTitleModal}
            setIsNewModal={setIsNewModal}
            setShowModal={setShowModal}
            setActiveForm={setActiveForm}
            allData={allData}
            setAllData={setAllData}
          />
        </div>
      </div>
    </div>
  );
};
