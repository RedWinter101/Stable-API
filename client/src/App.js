import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";


const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState("");
  const [Nprompt, updateNPrompt] = useState("");
  const [inference, updateSamplingSteps] = useState();
  const [width, updateWidth ]= useState();
  const [height, updateHeight] = useState();
  const [loading, updateLoading] = useState();

  const generate = async () => {
    updateLoading(true);
    const result = await axios.get(`http://127.0.0.1:3000/?prompt=${prompt}+Nprompt=${Nprompt}+inference=${inference}+width=${width}+height=${height}`);
    console.log(result);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading>Stable DIffusion🚀</Heading>
        <Text marginBottom={"10px"}>
          This react application leverages the model trained by Stability AI and
          Runway ML to generate images using the Stable Diffusion Deep Learning
          model. 
        </Text>
        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            placeholder="Prompt"
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate()} colorScheme={"blue"}>
            Generate
          </Button>
          <Input
            value={Nprompt}
            placeholder="Negative Prompt"
            onChange={(e) => updateNPrompt(e.target.value)}
            width={"350px"}
            required={true}
          ></Input>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          //<Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
          //<Image src={require("./lgs/Images8.png")} boxShadow="lg" />
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
        
        <Wrap className="btn" marginTop={"10px"}>
          <Input 
            margin={"5px"}
            value={inference}
            placeholder="Steps"
            onChange={(e) => updateSamplingSteps(e.target.value)}
            width={"105px"} 
            required={true}
          ></Input>
          <Input
            margin={"5px"}
            value={width}
            placeholder="Width"
            onChange={(e) => updateWidth(e.target.value)}
            width={"105px"} 
            required={true}
          ></Input>
          <Input
            margin={"5px"}
            value={height}
            placeholder="Height"
            onChange={(e) => updateHeight(e.target.value)}
            width={"105px"} 
            required={true}
          ></Input>
        </Wrap>
      </Container>
    </ChakraProvider>
  );
};

export default App;

