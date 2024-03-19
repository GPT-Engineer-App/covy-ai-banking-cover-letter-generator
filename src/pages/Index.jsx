import React, { useState } from "react";
import { Box, Heading, Text, VStack, Button, Textarea, Select, useToast } from "@chakra-ui/react";
import { FaFileUpload, FaRobot } from "react-icons/fa";

const Index = () => {
  const [resume, setResume] = useState("");
  const [company, setCompany] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const toast = useToast();

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setResume(event.target.result);
    };
    reader.readAsText(file);
  };

  const generateCoverLetter = async () => {
    if (!resume || !company) {
      toast({
        title: "Error",
        description: "Please upload your resume and select a company.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // TODO: Implement cover letter generation using AI
    // For demo purposes, we'll just set a placeholder cover letter
    setCoverLetter(`
      Dear Hiring Manager,

      I am excited to apply for the ${company} Investment Banking Summer Analyst program for 2024. With my strong background in finance and passion for investment banking, I believe I would be a valuable addition to your team.

      Throughout my academic and professional experiences, I have developed skills in financial analysis, modeling, and market research. I am eager to contribute these skills to ${company} and learn from the experienced professionals in your organization.

      Please find my resume attached for your consideration. Thank you for your time, and I look forward to the opportunity to discuss my qualifications further.

      Sincerely,
      [Your Name]
    `);
  };

  return (
    <Box p={8}>
      <VStack spacing={8} alignItems="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Covy.ai
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Generate tailored cover letters for investment banking positions
        </Text>
        <Box>
          <Text mb={2}>Upload your resume:</Text>
          <input type="file" onChange={handleResumeUpload} />
        </Box>
        <Box>
          <Text mb={2}>Select the company:</Text>
          <Select placeholder="Select company" value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value="Goldman Sachs">Goldman Sachs</option>
            <option value="JP Morgan">JP Morgan</option>
            <option value="Morgan Stanley">Morgan Stanley</option>
          </Select>
        </Box>
        <Button leftIcon={<FaRobot />} colorScheme="blue" onClick={generateCoverLetter}>
          Generate Cover Letter
        </Button>
        {coverLetter && (
          <Box>
            <Text mb={2}>Generated Cover Letter:</Text>
            <Textarea value={coverLetter} readOnly rows={10} />
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
