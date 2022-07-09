import { Tag, HStack, Flex } from "@chakra-ui/react";

export default function Filters({ data, features }) {
  return (
    <HStack spacing={features.length}>
      <Flex 
      overflowX="auto"
      >
        {features.map((feature) => (
          <Tag
            key={feature.id}
            borderRadius="full"
            variant="solid"
            colorScheme="green"
            minW="fit-content"
            marginRight={4}
          >
            {feature.specialty}
          </Tag>
        ))}
      </Flex>
    </HStack>
  );
}
