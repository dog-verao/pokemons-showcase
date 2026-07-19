import type { Preview } from '@storybook/react-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../src/theme/theme'

const preview: Preview = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient();
      return (
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;