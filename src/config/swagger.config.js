import swaggerJDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

const theme = new SwaggerTheme();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Doc User Endpoints",
            version: "1.0.0",
            description: "Documentation for API"
        },
        servers: [
            {
                url: 'http://localhost:8080',
            },
        ],
    },
    apis: ['./src/docs/*yaml']
}

const spec = swaggerJDoc(options);

const optionTheme = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
};

const swaggerDocs = (app) => {
    app.use('/documentation',
        swaggerUI.serve,
        swaggerUI.setup(spec, optionTheme)
    )
}

export default swaggerDocs;