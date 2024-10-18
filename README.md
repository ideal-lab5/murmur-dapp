# Ideal Labs Murmur Wallet DApp

A web UI to interact with the Murmur Wallet.

## Environment Variables

Copy `.env.example` to `.env`. If necessary, modify the values in the `.env` file.

```bash
cp .env.example .env
```

## Running Natively

To run this project natively, follow these steps:

### Installation

To install the necessary npm dependencies, run the following command in your project directory:

```bash
npm install
```

### Running the Development Server

To start the development server, use the following command:

```bash
npm run dev
```

The development server will start, and you can view the website by opening [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

This will create an optimized build of your application in the `out` directory.

## Running with Docker

You can also run the application using Docker. Follow these steps:

### Building the Docker Image

To build the Docker image, run the following command in the directory containing the Dockerfile:

```bash
docker build -t murmur-dapp .
```

### Running the Docker Container

To start a container from the built image, run the following command:

```bash
docker run -p 3000:3000 murmur-dapp
```

The application will start inside a Docker container, and you can access it at [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the Apache-2.0. See the [APACHE-LICENSE.md](./APACHE-LICENSE.md) file for details.

## Contact

For any inquiries, please contact [Ideal Labs](https://idealabs.network).
