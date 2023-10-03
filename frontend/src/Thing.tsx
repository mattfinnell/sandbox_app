import { Button, HStack, Input } from "@chakra-ui/react";
import { FC, useState } from "react";

export type ThingType = {
  id: number;
  name: string;
  description: string;
};

type ThingProps = {
  onUpdate: (thing: ThingType) => void;
  onDelete: (id: number) => void;
} & ThingType;

const Thing: FC<ThingProps> = ({
  id,
  name,
  description,
  onUpdate,
  onDelete,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  return (
    <HStack>
      {!edit ? (
        <p>
          <b>{newName === "" ? name : newName}</b>{" "}
          <i>"{newDescription === "" ? description : newDescription}"</i>
        </p>
      ) : (
        <>
          <Input
            placeholder={name}
            onChange={(event) => setNewName(event.target.value)}
            type="text"
          />
          <Input
            placeholder={description}
            onChange={(event) => setNewDescription(event.target.value)}
            type="text"
          />
        </>
      )}
      {edit === false ? (
        <Button
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </Button>
      ) : (
        <>
          <Button
            onClick={() => {
              onUpdate({
                id: id,
                name: newName === "" ? name : newName,
                description:
                  newDescription === "" ? description : newDescription,
              });
              setEdit(false);
            }}
          >
            Submit
          </Button>
          <Button
            onClick={() => {
              onDelete(id);
              setEdit(false);
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setEdit(false);
              setNewDescription("");
              setNewName("");
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </HStack>
  );
};

export default Thing;
