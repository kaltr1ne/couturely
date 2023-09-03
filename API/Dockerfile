FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 8080

#copy csprojand restore as distinct layers
COPY *.csproj ./
RUN dotnet restore

#copy everything alsr and build
COPY . ./
RUN dotnet publish -c Release -o out

#buld a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "API.dll"]