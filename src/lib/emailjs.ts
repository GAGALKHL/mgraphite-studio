import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_tjqtyyh';
const TEMPLATE_ID = 'template_w409wcj';
const PUBLIC_KEY = 'Bs5-9MTJI0JDU9p-J';

export interface ProjectRequestData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export async function sendProjectRequest(data: ProjectRequestData): Promise<void> {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      service_type: data.service,
      message: data.message,
      reply_to: data.email,
    },
    PUBLIC_KEY
  );
}
