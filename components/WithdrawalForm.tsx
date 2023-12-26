// components/WithdrawalForm.tsx

import React from 'react';
import { Box } from '@chakra-ui/react';

const WithdrawalForm: React.FC = () => {
  return (
    <Box maxW={['full', '640px', '800px', '1024px', '100%']} mx="auto">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfC5wLdmCwKGhNRZEdil40skmGV1qEOgkwk531rCIvFBU2jqA/viewform?embedded=true"
        width="100%"
        height="800"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
      >
        Loading...
      </iframe>
    </Box>
  );
};

export default WithdrawalForm;
