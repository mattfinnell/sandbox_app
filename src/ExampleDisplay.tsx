import {
  Button,
  HStack,
  Heading,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Thing, { ThingType } from "./Thing";
import { createThing, deleteThing, readThings, updateThing } from "./api";

type ExampleDisplayProps = {};
const ExampleDisplay: FC<ExampleDisplayProps> = () => {
  const { data, error, status } = useQuery("readThings", readThings);
  const { mutate: createMutation } = useMutation(createThing);
  const { mutate: updateMutation } = useMutation(updateThing);
  const { mutate: deleteMutation } = useMutation((id: number) =>
    deleteThing(id),
  );

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  return (
    <VStack align="">
      <Heading>Things</Heading>
      {status === "loading" && <Spinner size="lg" />}
      {status === "error" && <Heading>{"Some Error Happened ='("}</Heading>}
      {status === "success" &&
        data.map((thing: ThingType) => (
          <Thing
            {...thing}
            onUpdate={(thing: ThingType) => {
              updateMutation(thing);
            }}
            onDelete={deleteMutation}
          />
        ))}
      <Heading size="md">Create New Thing</Heading>
      <HStack>
        <Input
          placeholder="Name"
          onChange={(event) => setName(event.target.value)}
          type="text"
        />
        <Input
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
          type="text"
        />
        <Button onClick={() => createMutation({ name, description })}>
          Submit
        </Button>
      </HStack>
    </VStack>
  );
};

export default ExampleDisplay;
