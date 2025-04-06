'use client';

import {
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Card,
  Group,
  Avatar,
  Divider,
  Badge,
} from '@mantine/core';
import {
  LuZap,
  LuWrench,
  LuShieldCheck,
  LuTerminal,
  LuCode,
  LuTrendingUp,
} from 'react-icons/lu';

const features = [
  { icon: LuCode, title: '50+ Dev Tools', desc: 'All-in-one suite for daily developer needs.' },
  { icon: LuZap, title: 'Lightning Fast', desc: 'Instant response, no page reloads.' },
  { icon: LuTerminal, title: 'Terminal-Inspired UI', desc: 'Minimalist but powerful.' },
  { icon: LuWrench, title: 'Highly Customizable', desc: 'Configurable behavior for power users.' },
  { icon: LuShieldCheck, title: 'Private & Secure', desc: 'Client-side only. Nothing is stored.' },
  { icon: LuTrendingUp, title: 'Growing Weekly', desc: 'Always adding new tools & features.' },
];

const testimonials = [
  {
    name: 'Arjun T.',
    title: 'Senior Frontend Dev',
    quote: 'This is the toolbox I didn’t know I needed. Fast, reliable, and beautifully made.',
  },
  {
    name: 'Nisha K.',
    title: 'Full-stack Engineer',
    quote: 'Absolutely love the experience. UI is top-notch and the tools just work!',
  },
];

export default function Home12() {
  return (
    <main className="bg-gray-50">
      {/* HERO SECTION */}
      <section className="py-20 bg-white">
        <Container size="lg" className="text-center">
          <Title className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">
            Web Dev Tools – All-in-One Developer Toolkit
          </Title>
          <Text size="lg" color="dimmed" className="max-w-2xl mx-auto mb-6">
            From encoders to converters, formatters to generators – everything you need to speed up development, in one place.
          </Text>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition">
            Explore Tools
          </Button>
        </Container>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-gray-50">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <Card key={i} shadow="sm" radius="md" className="hover:shadow-lg transition">
                <Group align="start" className="gap-4">
                  <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <Icon size={24} />
                  </div>
                  <div>
                    <Text size="lg" fw={600}>
                      {title}
                    </Text>
                    <Text size="sm" color="dimmed">
                      {desc}
                    </Text>
                  </div>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-20 bg-white">
        <Container size="lg" className="text-center">
          <Title order={2} className="text-blue-600 mb-10">
            Loved by Developers
          </Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {testimonials.map((t, i) => (
              <Card key={i} shadow="sm" radius="md" className="p-6 text-left bg-gray-50">
                <Text className="italic mb-4">“{t.quote}”</Text>
                <Divider className="my-2" />
                <Group>
                  <Avatar radius="xl" />
                  <div>
                    <Text fw={600}>{t.name}</Text>
                    <Text size="xs" color="dimmed">
                      {t.title}
                    </Text>
                  </div>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <Container size="md">
          <Title order={2} className="mb-4">
            Build faster. Work smarter.
          </Title>
          <Text size="md" className="mb-6">
            Experience a powerful set of developer tools designed for speed and productivity.
          </Text>
          <Button size="md" variant="white" className="text-blue-700 font-medium">
            Get Started
          </Button>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t py-6">
        <Container size="lg" className="text-center">
          <Text size="sm" color="dimmed">
            © {new Date().getFullYear()} Web Dev Tools — Built by developers, for developers.
          </Text>
        </Container>
      </footer>
    </main>
  );
}
