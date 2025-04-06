'use client';

import {
  Container,
  Title,
  Text,
  Button,
  TextInput,
  Textarea,
  SimpleGrid,
  Card,
  Group,
  Badge,
  Divider,
  Avatar,
} from '@mantine/core';
import {
  LuPenTool,
  LuTerminal,
  LuLayoutDashboard,
  LuMessageSquare,
  LuCode,
  LuSparkles,
} from 'react-icons/lu';

export default function Home13() {
  return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="bg-white py-20 text-center">
        <Container size="lg">
          <Title className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Supercharge Your Dev Workflow
          </Title>
          <Text size="lg" color="dimmed" className="max-w-2xl mx-auto mb-6">
            All-in-one modern toolbox for developers – convert, generate, encode, decode, and more.
          </Text>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 transition">
            Explore Tools
          </Button>
        </Container>
      </section>

      {/* OUR CRAFT / MISSION */}
      <section className="py-16 bg-gray-100">
        <Container size="lg" className="text-center">
          <Title order={2} className="text-blue-700 mb-4">
            Crafted with Simplicity & Speed
          </Title>
          <Text size="md" color="dimmed" className="max-w-2xl mx-auto">
            Whether you're building a web app, debugging code, or converting data formats — our tools are designed to reduce friction and maximize focus.
          </Text>
        </Container>
      </section>

      {/* TOOLS SHOWCASE */}
      <section className="py-16 bg-white">
        <Container size="lg">
          <Title order={2} className="text-center text-blue-700 mb-10">Popular Tools</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {[
              { title: 'JSON Formatter', icon: LuCode },
              { title: 'Base64 Converter', icon: LuTerminal },
              { title: 'Password Generator', icon: LuSparkles },
              { title: 'HTML Entity Encoder', icon: LuPenTool },
              { title: 'Text Case Converter', icon: LuLayoutDashboard },
              { title: 'QR Code Generator', icon: LuMessageSquare },
            ].map((tool, i) => (
              <Card key={i} shadow="sm" padding="lg" radius="md" className="hover:shadow-lg transition">
                <Group>
                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                    <tool.icon size={22} />
                  </div>
                  <Text fw={600}>{tool.title}</Text>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </section>

      {/* DEVELOPER USE CASES */}
      <section className="py-16 bg-gray-50">
        <Container size="lg">
          <Title order={2} className="text-center text-blue-700 mb-10">Use Cases</Title>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {[
              {
                title: 'Frontend Developers',
                text: 'Quickly test, convert, and format data for your UI components.',
              },
              {
                title: 'Backend Developers',
                text: 'Encode/decode data formats, generate secure passwords or hash values.',
              },
              {
                title: 'Data Analysts',
                text: 'Convert between CSV, JSON, TSV, or analyze structure visually.',
              },
              {
                title: 'Educators',
                text: 'Showcase real-time examples to students with live playgrounds.',
              },
            ].map((item, idx) => (
              <Card key={idx} shadow="sm" padding="lg" className="bg-white">
                <Title order={4} className="mb-2">{item.title}</Title>
                <Text color="dimmed">{item.text}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </section>

      {/* LIVE PLAYGROUND */}
      <section className="py-16 bg-white">
        <Container size="lg" className="text-center">
          <Title order={2} className="text-blue-700 mb-6">Live Playground (Coming Soon)</Title>
          <Text size="md" color="dimmed" className="max-w-2xl mx-auto mb-4">
            Run real-time experiments with data conversions and previews — no setup needed.
          </Text>
          <Card className="mt-6 bg-gray-100 text-gray-500 py-12">
            <Text>💡 Playground UI will appear here. Stay tuned!</Text>
          </Card>
        </Container>
      </section>

      {/* SUGGEST A TOOL */}
      <section className="py-16 bg-gray-100">
        <Container size="sm">
          <Title order={2} className="text-center text-blue-700 mb-6">Suggest a Tool</Title>
          <Text size="md" className="text-center mb-8" color="dimmed">
            Can't find what you need? Help us improve by suggesting a tool.
          </Text>
          <form className="space-y-4">
            <TextInput label="Tool Name" placeholder="e.g., JWT Decoder" required />
            <Textarea label="Description or Purpose" placeholder="Describe what the tool should do…" minRows={4} required />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 transition w-full">
              Submit Suggestion
            </Button>
          </form>
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