import SwaggerUi from "swagger-ui-react";
import 'swagger-ui-react/swagger-ui.css';
export default function ApiDoc() {
    return (
        <div>
            <SwaggerUi url="/swagger.json"/>
        </div>
    );
};