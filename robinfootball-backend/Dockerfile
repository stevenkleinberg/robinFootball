# -------- STAGE 1: Build --------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY robinfootball-backend.sln ./
COPY robinfootball-backend/RobinFootball.API/ ./robinfootball-backend/RobinFootball.API/
COPY robinfootball-backend/RobinFootball.Tests/ ./robinfootball-backend/RobinFootball.Tests/

RUN dotnet restore

COPY . .

WORKDIR /src/robinfootball-backend/RobinFootball.API
RUN dotnet publish -c Release -o /app/publish

# -------- STAGE 2: Runtime --------
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "RobinFootball.API.dll"]
