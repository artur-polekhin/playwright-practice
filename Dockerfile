# Base Image
FROM mcr.microsoft.com/playwright:v1.58.2-noble

# Set the working directory
WORKDIR /tests

# Copy test files and configuration
COPY . .

# Run tests
CMD ["npx", "playwright", "test", "--project=e2e-smoke"]

