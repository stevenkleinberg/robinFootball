# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy solution and project files
COPY robinfootball-backend.sln .
COPY RobinFootball.API/RobinFootball.API.csproj ./RobinFootball.API/
COPY RobinFootball.Tests/RobinFootball.Tests.csproj ./RobinFootball.Tests/

# Restore dependencies
RUN dotnet restore robinfootball-backend.sln

# Copy the rest of the source code
COPY . .

# Build the app
RUN dotnet publish RobinFootball.API/RobinFootball.API.csproj -c Release -o out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .

# Run the app
ENTRYPOINT ["dotnet", "RobinFootball.API.dll"]
