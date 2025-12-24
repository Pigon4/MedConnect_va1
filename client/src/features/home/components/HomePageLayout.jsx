import { Container, Row } from "react-bootstrap";
import { HeroImage } from "./HeroImage";
import { WelcomeSection } from "./WelcomeSection";
import { FeatureCard } from "./FeatureCard";
import { HomeBorder } from "./HomeBorder";
import { Link } from "react-router-dom";

export const HomePageLayout = ({ user }) => {
  const isPremium = user?.subscription === "premium";

  return (
    <>
      <Container className="py-5">
        <Row className="align-items-center">
          {isPremium ? (
            <WelcomeSection
              title={"Добре дошли в MedConnect+"}
              description="Вашият личен здравен асистент — управлявайте прегледи, лекарства, имунизации, профилактики и медицински досиета на едно сигурно място."
              redirectUrl="/register"
            />
          ) : (
            <WelcomeSection
              title={"Добре дошли в MedConnect+"}
              description="Вашият личен здравен асистент — управлявайте прегледи, лекарства и медицински досиета на едно сигурно място."
              redirectUrl="/register"
            />
          )}
          <HeroImage />
        </Row>

        <HomeBorder />

        <Row className="justify-content-center g-4 mt-4">
          <FeatureCard
            title="👨‍⚕️ Запазване на часове"
            description="С MedConnect можете лесно да записвате часове при лекари."
          />
          <FeatureCard
            title="💊 Напомняния за медикаменти"
            description="Получавайте автоматични известия за всяко лекарство."
          />
          <FeatureCard
            title="📁 Защитено хранилище"
            description="Съхранявайте медицинските си досиета сигурно."
          />
          <FeatureCard
            title="🩺 Проверка на симптоми"
            description="Получете автоматични предложения за диагноза."
          />

          {isPremium && (
            <FeatureCard
              title="💉 Имунизации и профилактики"
              description="Автоматични напомняния за вашето здраве."
            />
          )}
        </Row>
      </Container>

      {/* 🔽 ВИНАГИ ВИДИМ ЛИНК */}
      <Container className="text-center my-4">
        <Link
          to="/admin/login"
          style={{
            fontWeight: "bold",
            color: "#0d6efd",
            textDecoration: "underline",
            fontSize: "1.1rem",
          }}
        >
          Вход за администратор
        </Link>
      </Container>
    </>
  );
};
