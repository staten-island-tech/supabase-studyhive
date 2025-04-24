import type { test } from '@/lib/UserInfo'
import { ref } from 'vue'
export function userInfo() {
  const Info = ref<test[]>([
    {
      title: 'Biology Key Concepts',
      user: 'Emily Davis',
      num: 42,
    },
    {
      title: 'Chemistry Equations',
      user: 'David Lee',
      num: 35,
    },
    {
      title: 'World History Timeline',
      user: 'Sophia Garcia',
      num: 50,
    },
    {
      title: 'French Vocabulary',
      user: 'Liam Johnson',
      num: 60,
    },
    {
      title: 'Mathematics Formulas',
      user: 'Olivia Martinez',
      num: 28,
    },
    {
      title: 'Physics Laws',
      user: 'Aiden Wilson',
      num: 22,
    },
    {
      title: 'Computer Science Algorithms',
      user: 'Isabella Brown',
      num: 45,
    },
    {
      title: 'Psychology Definitions',
      user: 'Mason Moore',
      num: 39,
    },
  ])
  return { Info }
}
