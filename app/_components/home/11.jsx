'use client';

import { Container, Title, Text, Button, SimpleGrid, Card, Group } from '@mantine/core';
import { LuZap, LuWrench, LuShieldCheck, LuTerminal, LuCode, LuTrendingUp } from 'react-icons/lu';

const features = [
  {
    icon: LuCode,
    title: '50+ Dev Tools',
    desc: 'All-in-one platform for daily developer tasks.',
  },
  {
    icon: LuZap,
    title: 'Lightning Fast',
    desc: 'Optimized UI with instant response.',
  },
  {
    icon: LuTerminal,
    title: 'Terminal-Inspired UI',
    desc: 'Feels right at home for coders.',
  },
  {
    icon: LuWrench,
    title: 'Highly Customizable',
    desc: 'Make the tools behave the way you want.',
  },
  {
    icon: LuShieldCheck,
    title: 'Private & Secure',
    desc: 'Client-side processing. Nothing gets stored.',
  },
  {
    icon: LuTrendingUp,
    title: 'Growing Constantly',
    desc: 'New tools and improvements weekly.',
  },
];

export default function Home11() {
  return (
    <main className="bg-background">
      {/* HERO SECTION */}
      <section className="bg-white py-20">
        <Container size="lg" className="text-center">
          <Title className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            Web Dev Tools — Built for Developers
          </Title>
          <Text size="lg" color="dimmed" className="max-w-2xl mx-auto mb-6">
            A growing suite of productivity tools built with performance, privacy, and dev-experience in mind.
          </Text>
          <Button size="lg" className="bg-primary hover:bg-primaryHover transition">
            Explore All Tools
          </Button>
        </Container>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-gray-50">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <Card key={i} shadow="sm" radius="md" className="hover:shadow-lg transition-all">
                <Group>
                  <div className="p-2 bg-blue-100 rounded-full text-primary">
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

      {/* CALL TO ACTION */}
      <section className="bg-white py-16">
        <Container size="md" className="text-center">
          <Title order={2} className="mb-4 text-primary">
            Built for Developers, by Developers
          </Title>
          <Text size="md" color="dimmed" className="mb-6">
            Stop wasting time switching tabs — everything you need is here.
          </Text>
          <Button size="md" className="bg-accent hover:bg-orange-600 transition">
            Try Now – It’s Free!
          </Button>
        </Container>
      </section>
    </main>
  );
}
