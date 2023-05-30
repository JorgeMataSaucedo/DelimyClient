import { image } from "../../../assets";

// Función para obtener una imagen de usuario aleatoria de la API Random User
const getRandomUserImage = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const userImage = data.results[0]?.picture.medium;
    return userImage;
  } catch (error) {
    console.log("Error al obtener la imagen del usuario:", error);
    return null;
  }
};

export const reviewsData = async () => {
  const randomUserImage = await getRandomUserImage();

  return [
    {
      userName: "Alonso Campos",
      userType: "Chef de Repostería",
      avatar: randomUserImage || image.avatar01,
      comment:
          "Un curso excelente, el profesor explica detalladamente las técnicas de repostería y cómo hacer cada postre paso a paso. He buscado muchos cursos de repostería, pero ninguno me ha enseñado tanto como este. Ahora puedo crear deliciosos postres sin ningún tipo de problema gracias al curso.",
    },
    {
      userName: "Valentina Rubio",
      userType: "Chef de Cocina Internacional",
      avatar: randomUserImage || image.avatar02,
      comment:
          "El contenido del curso es muy completo y de necesitar cualquier dato adicional, el profesor está siempre dispuesto a responderlo. Ya he creado platos de diversas culturas gracias a lo aprendido en el curso.",
    },
    {
      userName: "David Ramiro",
      userType: "Chef de Pastelería",
      avatar: randomUserImage || image.avatar03,
      comment:
          "Si te gustan los cursos que profundizan en la materia, te recomiendo este curso de pastelería. El profesor explica de forma completa todos los conceptos necesarios para crear dulces y pasteles exquisitos. ¡Un gran curso!",
    },
    {
      userName: "Marc Perez",
      userType: "Chef de Cocina Saludable",
      avatar: randomUserImage || image.avatar04,
      comment:
          "Empecé el curso sin saber nada de cocina saludable y ahora me siento preparado para crear platos nutritivos y deliciosos. Las explicaciones claras y concisas han sido fundamentales para mi aprendizaje.",
    },
    {
      userName: "Jesus Cruz",
      userType: "Chef de Sushi",
      avatar: randomUserImage || image.avatar05,
      comment:
          "Me ha parecido un buen curso, las explicaciones son muy claras y lo que enseñan me ha sido muy útil para preparar sushi en casa. ¡Recomendado!",
    },
    {
      userName: "Francisco Garcia",
      userType: "Chef de Parrilla",
      avatar: randomUserImage || image.avatar06,
      comment:
          "Aprendes todo lo que promete el curso y te da la capacidad para después crear tus propias recetas. Gracias al instructor por compartir su conocimiento y por hacerlo de manera tan amena.",
    },
  ];
};
